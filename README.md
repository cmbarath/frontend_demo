# Chennai Pulse

> Explore Chennai. Understand the city. Take action.

Chennai Pulse is an academic frontend project that presents a simulated digital view of Chennai neighborhoods, city indicators, civic issues, and sustainability habits. It is designed as an interactive smart-city dashboard demonstration built with plain HTML, CSS, and JavaScript.

**Important:** This project uses fictional demonstration data. It is not an official government application and does not represent live municipal, traffic, environmental, or civic information.

## Preview

The application includes a dark visual theme by default, a light theme option, responsive layouts, animated page transitions, interactive cards, simulated charts, and browser-based data persistence.

## Features

- **Home page** with a Chennai hero section, city snapshot counters, featured areas, and navigation to the main experiences.
- **Explore Chennai** page with an illustrative map, neighborhood markers, search filtering, and area details.
- **City Dashboard** with neighborhood selection, simulated scores, mobility/environment/community metrics, an animated circular index, and an activity bar chart.
- **Insights** page with tabs for mobility, environment, lifestyle, and commercial activity.
- **Sustainability calculator** that generates a fictional habit score from travel distance, transport mode, trip frequency, and reusable-product usage.
- **Report an Issue** form for simulated civic reports with issue type, location, landmark, description, priority, and optional image attachment.
- **My Chennai** profile area for saved neighborhoods, submitted reports, habit scores, and preferences.
- **Theme preferences** for dark and light modes.
- **Motion preferences** for full or reduced animation.
- **Responsive navigation** with a mobile menu.
- **Local browser storage** for saved areas, reports, habit scores, and preferences.
- **Accessible feedback patterns** including labels, buttons, modals, toast messages, and empty states.

## Pages

| Page | File | Purpose |
| --- | --- | --- |
| Home | `index.html` | Introduction, city snapshot, featured areas, and entry points |
| Explore | `pages/explore.html` | Search and inspect simulated Chennai neighborhoods |
| Dashboard | `pages/dashboard.html` | View area scores, metrics, and charts |
| Insights | `pages/insights.html` | Browse simulated city insights and calculate a habit score |
| Report | `pages/report.html` | Submit a fictional civic issue report |
| My Chennai | `pages/my-chennai.html` | Review saved areas, reports, scores, and preferences |

## Technology Stack

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
- CSS custom properties for themes and design tokens
- Inline SVG for generated charts
- Browser `localStorage` for client-side persistence
- Google Fonts: Inter and Outfit, with local fallback fonts

No frontend framework, backend, database, bundler, or third-party JavaScript library is required.

## Getting Started

### Prerequisites

You only need a modern web browser. A local static server is recommended because the project contains multiple linked HTML pages and browser storage behavior is more reliable when served over HTTP.

### Option 1: Open directly

Open `index.html` in a modern browser.

### Option 2: Run a local static server

From the project root, run one of the following commands.

Using Python:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

Using Node.js and `serve`:

```bash
npx serve .
```

No installation or build step is required for the project itself.

## Project Structure

```text
Final_Project/
├── index.html                 # Home page
├── assets/
│   ├── icons/                 # Reserved for icon assets
│   ├── illustrations/         # Reserved for illustrations
│   └── images/                # Reserved for image assets
├── css/
│   ├── animations.css         # Animations and reveal effects
│   ├── components.css         # Shared UI components
│   ├── global.css             # Global layout and typography
│   ├── reset.css              # Browser style reset
│   ├── responsive.css         # Responsive behavior
│   ├── variables.css          # Colors, typography, spacing, and themes
│   └── pages/                 # Page-specific styles
├── js/
│   ├── app.js                 # Global application initialization
│   ├── animations.js          # Scroll and interaction animations
│   ├── charts.js              # Vanilla SVG chart generation
│   ├── components.js          # Navbar, modal, and toast behavior
│   ├── data.js                # Simulated city and insight data
│   ├── storage.js             # LocalStorage API
│   └── pages/                 # Page-specific JavaScript
└── pages/
    ├── dashboard.html
    ├── explore.html
    ├── insights.html
    ├── my-chennai.html
    └── report.html
```

## How It Works

### Data model

The simulated areas, dashboard metrics, insights, and issue types are defined in `js/data.js`. Each area includes values such as:

- Overall score
- Mobility
- Environment
- Community
- Activity
- Illustrative map coordinates

The map coordinates are percentage positions in a visual layout. They are not geographic coordinates and the map is not to scale.

### Charts

`js/charts.js` generates the dashboard charts without an external charting library:

- Circular progress indicator for the area score
- Animated bar chart for simulated activity history

### Browser storage

The storage helper in `js/storage.js` uses keys prefixed with `chennaiPulse_`. It stores:

- Saved area IDs
- Submitted reports
- Sustainability habit score
- Theme preference
- Motion preference

All stored data is local to the current browser and device. It is not sent to a server.

## Demo Workflow

1. Open **Explore** and select a neighborhood marker.
2. Open the neighborhood dashboard to inspect its simulated indicators.
3. Save an area and find it later under **My Chennai**.
4. Open **Insights** and calculate a fictional sustainability score.
5. Submit a sample civic issue under **Report**.
6. Review saved areas, reports, and preferences under **My Chennai**.

## Limitations

- All city metrics, neighborhood scores, insight values, and report statuses are fictional.
- The application has no backend, authentication, API integration, or database.
- Civic reports are stored locally and are not submitted to a real authority.
- Uploaded report images are converted to Base64 and stored in `localStorage`, which has limited browser storage capacity.
- The dashboard activity history is generated from simulated area scores rather than real historical records.
- The illustrative map does not provide real geospatial navigation or location services.
- Google Fonts require an internet connection; fallback fonts are used if they cannot be loaded.
- Clearing browser storage or using a different browser removes access to locally saved demo data.

## Future Improvements

- Connect the dashboard to live or open municipal datasets.
- Replace the illustrative map with a real map provider or geographic visualization.
- Add a backend for authenticated users and persistent civic reports.
- Move uploaded images to object storage instead of `localStorage`.
- Add automated tests for calculators, storage behavior, navigation, and form validation.
- Add loading, error, and offline states for API-backed data.
- Add real accessibility testing with keyboard navigation and screen readers.

## Contributing

1. Fork the repository.
2. Create a feature branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Make your changes and test the pages in a modern browser.
4. Commit your changes:

   ```bash
   git commit -m "Add your change description"
   ```

5. Push the branch and open a pull request.

## License

No license has been specified for this project yet. Add a license file before distributing or reusing the project publicly.

## Disclaimer

Chennai Pulse is an academic frontend demonstration. It is not affiliated with the Greater Chennai Corporation, the Government of Tamil Nadu, or any other official government body. All metrics and civic workflows shown in the application are simulated for educational and presentation purposes.
