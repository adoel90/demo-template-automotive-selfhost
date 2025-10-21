import { TinaNodeBackend, LocalBackendAuthProvider } from "@tinacms/datalayer";

import { TinaAuthJSOptions, AuthJsBackendAuthProvider } from "tinacms-authjs";

import databaseClient from "../../../tina/__generated__/databaseClient";

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

const handler = TinaNodeBackend({
  authProvider: isLocal
    ? LocalBackendAuthProvider()
    : AuthJsBackendAuthProvider({
        authOptions: TinaAuthJSOptions({
          databaseClient: databaseClient,
          secret: process.env.NEXTAUTH_SECRET!,
        }),
      }),
  databaseClient,
});

export default async  (req, res) => {
  // Modify the request here if you need to

   console.log("🔍 [Tina API] Incoming request:", req.method, req.url);

  try {
    await handler(req, res);
  } catch (error) {
    console.error("❌ [Tina API] Error during request:", error.message);
    console.error(error.stack);
    res.status(500).json({ error: error.message });
  }

  // return handler(req, res);
};
