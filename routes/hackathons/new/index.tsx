import { Handlers } from "$fresh/server.ts";
import * as uuid from "https://deno.land/std@0.207.0/uuid/mod.ts";

interface Hackathon {
  id: string;
  name: string;
  desc: string;
  startDate: string;
  endDate: string;
};

export async function createHackathon(hackathon: Hackathon) {
  const hackathonKey = ["Hackathon", hackathon.id];

  const kv = await Deno.openKv("https://api.deno.com/databases/0319ed70-c0a9-4215-8499-8c4c9aaa1fbd/connect");
  const ok = await kv.atomic().set(hackathonKey, hackathon).commit();

  if (!ok) throw new Error("Something went wrong.");
}

export const handler: Handlers = {
  async GET(req, ctx) {
    return await ctx.render();
  },

  async POST(req, ctx) {
    const form = await req.formData();
    const id = uuid.v1.generate();
    const name = form.get("name")?.toString();
    const desc = form.get("desc")?.toString();
    const startDate = form.get("start-date")?.toString();
    const endDate = form.get("end-date")?.toString();

    const createdHackathon = createHackathon(
      { id: id, name: name, desc: desc, startDate: startDate, endDate: endDate }
    )
    
    // Redirect User to thank you page.
    const headers = new Headers();
    headers.set("location", "/thanks");

    return new Response(null, {
      status: 303, // See Other
      headers,
    });
  },
};

export default function viewHackathon() {
  var date = new Date();
  var currentDate = date.toISOString().split("T")[0];
  date.setDate(date.getDate() + 365);
  var maxDate = date.toISOString().split("T")[0];
  return (
    <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-lg">
        <h1 class="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
          Create a new hackathon
        </h1>

        <form
          method="post"
          class="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
        >

          <div>
      <label for="name" class="sr-only">name</label>

            <div class="relative">
              <input
                name="name"
                class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter hackathon name"
              />

              <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div>
            <label for="desc" class="sr-only">description</label>

            <div class="relative">
              <input
                name="desc"
                class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter hackathon description"
              />

              <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div>
            <label for="start_date" class="sr-only">start date</label>

            <div class="relative">
              <input
                type="date"
                id="start"
                name="start-date"
                value={currentDate}
                min={currentDate}
                max={maxDate}
                class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter start date"
              />

              <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div>
            <label for="end_date" class="sr-only">end date</label>

            <div class="relative">
              <input
                type="date"
                id="start"
                name="end-date"
                value={currentDate}
                min={currentDate}
                max={maxDate}
                class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter end date"
              />

              <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
            </div>
          </div>

          <button
            type="submit"
            class="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
