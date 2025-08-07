// app/settings/page.tsx

export default function SettingsPage() {
  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your app settings below.</p>
      </div>

      {/* Preferences Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Preferences</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Theme</label>
            <select className="mt-1 block w-full border rounded px-3 py-2">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Language</label>
            <select className="mt-1 block w-full border rounded px-3 py-2">
              <option value="en">English</option>
              <option value="km">Khmer</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            Save Preferences
          </button>
        </form>
      </section>
    </div>
  );
}
