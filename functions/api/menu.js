const ALLOWED = new Set([
  "benjamin-franklin-college",
  "berkeley-college",
  "branford-college",
  "davenport-college",
  "ezra-stiles-college",
  "hopper-college",
  "jonathan-edwards-college",
  "morse-college",
  "pauli-murray-college",
  "pierson-college",
  "saybrook-college",
  "silliman-college",
  "timothy-dwight-college",
  "trumbull-college"
]);

export async function onRequestGet({ request }) {
  const u = new URL(request.url);
  const slug = u.searchParams.get("slug");
  const meal = u.searchParams.get("meal");
  const date = u.searchParams.get("date");

  if (
    !ALLOWED.has(slug) ||
    ![
      "breakfast",
      "lunch",
      "dinner",
      "salad-bar",
      "desserts-daily-offerings"
     ].includes(meal) ||
    !/^\d{4}-\d{2}-\d{2}$/.test(date || "")
  ) {
    return new Response("Bad request", { status: 400 });
  }

  const [y, m, d] = date.split("-");

  const target =
    `https://yalehospitality.api.nutrislice.com/menu/api/weeks/school/` +
    `${slug}/menu-type/${meal}/${y}/${m}/${d}/`;

  try {
    const r = await fetch(target, {
      headers: {
        "Accept": "application/json",
        "User-Agent": "YaleResCoMenu/1.0"
      }
    });

    const body = await r.text();

    return new Response(body, {
      status: r.status,
      headers: {
        "Content-Type":
          r.headers.get("Content-Type") || "application/json",
        "Cache-Control": "public, max-age=300"
      }
    });
  } catch (e) {
    return new Response(
      JSON.stringify({ error: "Upstream request failed" }),
      {
        status: 502,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}
