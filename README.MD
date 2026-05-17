# SketchyNews

Transform any news headline into a striking AI-generated illustration powered by OpenAI DALL-E 3.

## Features

- **AI image generation** from news headlines using DALL-E 3
- **Per-user API key** — each user brings their own OpenAI key, stored securely in browser `localStorage`
- **Privacy-first** — keys are sent over HTTPS and never logged or stored server-side
- **Responsive dark UI** built with Next.js 15, React 19, and Tailwind CSS v4
- **One-click PNG download** via a server-side proxy

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [pnpm](https://pnpm.io/) — install with `npm i -g pnpm`
- An [OpenAI API key](https://platform.openai.com/api-keys) (each user can provide their own via the UI)

### Installation

```bash
git clone https://github.com/manelcomiche/sketchynews.git
cd sketchynews
pnpm install
```

### Configuration

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
|---|---|---|
| `OPENAI_API_KEY` | No | Server-side fallback key (users without a personal key will use this) |
| `OPENAI_BASE_URL` | No | Custom OpenAI-compatible base URL for proxies or alternative providers |

If neither is set, users must enter their own key via the **API Key** button in the UI.

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production

```bash
pnpm build
pnpm start
```

## Usage

1. Click **API Key** in the header and enter your OpenAI key.
2. Type a news headline or scene description in the input.
3. Press **Generate Image** (or **⌘+Enter** / **Ctrl+Enter**).
4. Download the 1024×1024 PNG with one click.

## Live Demo

[sketchynews.manel.digital](https://sketchynews.manel.digital/)

## Tech Stack

| | |
|---|---|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| UI | [React 19](https://react.dev/) + [Tailwind CSS v4](https://tailwindcss.com/) |
| AI | [OpenAI SDK](https://github.com/openai/openai-node) — DALL-E 3 |
| Language | TypeScript |
| Package manager | [pnpm](https://pnpm.io/) |

## Contributing

Issues and pull requests are welcome. For larger changes, open an issue first to discuss what you'd like to change.

## Credits

Developed with care by [Manel Comiche](https://manelcomiche.com) — [hola@manelcomiche.com](mailto:hola@manelcomiche.com)

## License

[GNU AGPL v3.0](LICENSE) — if you deploy a modified version, you must make the source available to your users.
