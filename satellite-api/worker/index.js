export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/api/N2YO.com/positions") {
      // Fetch from external API or return mock data
      const mockData = {
        info: { satname: "OPS 8701", satid: 13086 },
        positions: [{ satlatitude: 1.65, satlongitude: 21.2 }],
      };
      return new Response(JSON.stringify(mockData), {
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response("Not Found", { status: 404 });
  },
};
