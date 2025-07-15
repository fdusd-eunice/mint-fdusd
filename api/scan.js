export default (req, res) => {
  // Extract stamp ID and location from query parameters
  const { stamp } = req.query;
  const location = req.query.loc ? JSON.parse(decodeURIComponent(req.query.loc)) : null;

  // Basic validation
  if (!stamp || isNaN(parseInt(stamp)) || parseInt(stamp) < 1 || parseInt(stamp) > 10) {
    return res.status(400).json({ success: false, message: 'Invalid stamp ID' });
  }

  // Simulate location check (replace with actual event coordinates)
  const eventLocation = { latitude: 22.2793, longitude: 114.1628 }; // Example: Hong Kong coordinates
  if (location && Math.abs(location.coords.latitude - eventLocation.latitude) > 0.01 || 
      Math.abs(location.coords.longitude - eventLocation.longitude) > 0.01) {
    return res.status(403).json({ success: false, message: 'Outside event area' });
  }

  // Mock user ID (replace with authenticated user ID from SSO in production)
  const userId = 'test-user'; // Placeholder, use req.user or token-based ID

  // Simulate stamp storage (replace with a database like Firebase)
  let stamps = [];
  if (req.cookies.stamps) {
    stamps = JSON.parse(req.cookies.stamps);
  }
  if (!stamps.includes(stamp)) {
    stamps.push(stamp);
    res.setHeader('Set-Cookie', `stamps=${JSON.stringify(stamps)}; Path=/; HttpOnly`);
  }

  // Return success if stamp is new, limit to 10
  const stampCount = stamps.length;
  if (stampCount <= 10) {
    return res.status(200).json({ success: true, stampCount, entries: stampCount });
  } else {
    return res.status(200).json({ success: false, message: 'Stamp limit reached' });
  }
};
