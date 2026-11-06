async function loadBookings() {
  const container = document.getElementById("bookingsList");

  if (!container) {
    console.error("bookingsList element not found");
    return;
  }

  container.innerHTML = "Loading bookings...";

  try {
    // 1. Fetch bookings WITHOUT profiles relationship
    const { data: bookings, error: bookingError } =
      await client
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

    if (bookingError) throw bookingError;

    if (!bookings || bookings.length === 0) {
      container.innerHTML = "No bookings found.";
      return;
    }

    // 2. Find customer IDs
    const customerIds = [
      ...new Set(
        bookings
          .map(b => b.customer_id)
          .filter(Boolean)
          .map(String)
      )
    ];

    // 3. Fetch profiles separately
    let profiles = [];

    if (customerIds.length) {
      const { data, error } = await client
        .from("profiles")
        .select("*")
        .in("id", customerIds);

      if (error) {
        console.warn("Profiles could not be loaded:", error.message);
      } else {
        profiles = data || [];
      }
    }

    // 4. Match profiles with bookings
    const profileMap = new Map(
      profiles.map(p => [String(p.id), p])
    );

    // 5. Display bookings
    container.innerHTML = bookings.map(booking => {
      const profile = profileMap.get(
        String(booking.customer_id || "")
      );

      const customerName =
        profile?.full_name ||
        booking.customer_name ||
        booking.name ||
        "Customer";

      const phone =
        profile?.phone ||
        booking.phone ||
        booking.customer_phone ||
        "Not available";

      return `
        <div class="booking-card">
          <h3>${escapeBookingText(customerName)}</h3>
          <p>Phone: ${escapeBookingText(phone)}</p>
          <p>Service: ${escapeBookingText(booking.service_name || booking.service || "-")}</p>
          <p>Date: ${escapeBookingText(booking.booking_date || booking.date || "-")}</p>
          <p>Time: ${escapeBookingText(booking.booking_time || booking.time || "-")}</p>
          <p>Status: ${escapeBookingText(booking.status || "Pending")}</p>
        </div>
      `;
    }).join("");

  } catch (error) {
    console.error("Bookings error:", error);
    container.innerHTML =
      `<p>Could not load bookings: ${escapeBookingText(error.message)}</p>`;
  }
}

function escapeBookingText(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}
