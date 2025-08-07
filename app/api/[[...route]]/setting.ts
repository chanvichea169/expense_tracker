import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { and, eq } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

import { db } from "@/db/drizzle";
import { preferences, insertPreferenceSchema } from "@/db/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";

const app = new Hono()
  .use("*", clerkMiddleware())

  .get("/", async (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) return c.json({ error: "unauthorized" }, 401);

    const data = await db
      .select()
      .from(preferences)
      .where(eq(preferences.userId, auth.userId));

    return c.json({ data });
  })

  .post("/", zValidator("json", insertPreferenceSchema), async (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) return c.json({ error: "unauthorized" }, 401);
    const values = c.req.valid("json");

    const [data] = await db
      .insert(preferences)
      .values({
        id: createId(),
        userId: auth.userId,
        ...values,
      })
      .returning();

    return c.json({ data });
  })

  .patch(
    "/:id",
    zValidator("param", z.object({ id: z.string() })),
    zValidator("json", insertPreferenceSchema),
    async (c) => {
      const auth = getAuth(c);
      if (!auth?.userId) return c.json({ error: "unauthorized" }, 401);

      const { id } = c.req.valid("param");
      const values = c.req.valid("json");

      const [data] = await db
        .update(preferences)
        .set(values)
        .where(and(eq(preferences.id, id), eq(preferences.userId, auth.userId)))
        .returning();

      if (!data) return c.json({ error: "Not found" }, 404);
      return c.json({ data });
    }
  )

  .delete(
    "/:id",
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const auth = getAuth(c);
      if (!auth?.userId) return c.json({ error: "unauthorized" }, 401);

      const { id } = c.req.valid("param");

      const [data] = await db
        .delete(preferences)
        .where(and(eq(preferences.id, id), eq(preferences.userId, auth.userId)))
        .returning();

      if (!data) return c.json({ error: "Not found" }, 404);
      return c.json({ data });
    }
  );

export default app;
