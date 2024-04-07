# Bao Bank

Food distribution project for Codebrew 2024.

Running right now at https://bao-bank.vercel.app/

Built on Next.js. Uses Supabank for backend cloud computing.

## How to run?
- Put the required environment variables to the ./.env file (replace square-bracketed strings):
    ```sh
    # When adding additional environment variables, the schema in "/src/env.js"
    # should be updated accordingly.
    
    NEXT_PUBLIC_SUPABASE_URL=[replace with Supabase project URL]
    NEXT_PUBLIC_SUPABASE_ANON_KEY=[replace with Supabase project anon public API key]
    GOOGLE_MAPS_API=[replace with google maps API key]
    ```
- Run
  - with node.js/npm: `npm run dev`
  - with bun: `bun run dev`
