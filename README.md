Pick Picker is a full-stack photo gallery sharing platform for professional photographers and studios. It enables photographers to register with a unique phone number and create multiple galleries of client photos. Once a gallery’s photos are uploaded (one-time only), the app automatically generates a secure ZIP download link. Clients can then use these links to easily download their photos via email, WhatsApp, or other messaging apps. This README follows recommended best practices by clearly stating what the project does and why it’s useful
docs.github.com
medium.com
.
Key Features

In line with recommended README practices
github.com
, Pick Picker’s key features include:

    User Registration: Photographers register with a unique phone number (one per user account).

    Gallery Management: Create and manage multiple photo galleries for each client.

    One-Time Upload: Photos uploaded to a gallery cannot be re-uploaded or replaced, ensuring data integrity.

    ZIP Downloads: Automatically generate a downloadable ZIP file containing all photos in a gallery.

    Shareable Links: Clients receive download links (via email, WhatsApp, etc.) to easily access their photos.

Tech Stack

As advised by common README conventions
dev.to
, we list the main technologies used:

    Frontend: React, HTML/CSS, Tailwind CSS, React Router DOM, Redux, Axios.

    Backend: Node.js, Express.js, and the Archiver library for on-the-fly ZIP file generation.

Deployment

The README also specifies deployment details as recommended
dev.to
:

    Backend (API): Deployed on Render.

    Frontend (Web): Deployed on Vercel.