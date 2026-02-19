// Placeholder Vercel Serverless Function — Phase 1
// Returns a 200 success response. Does not forward data anywhere yet.
// To integrate a real backend (CRM, email service, etc.), replace the
// response body here and add the outbound fetch in a later phase.

module.exports = (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method Not Allowed' });
    }

    // Phase 1: placeholder only — data is intentionally not forwarded
    return res.status(200).json({ success: true });
};
