import { CopilotRuntime, OpenAIAdapter } from "@copilotkit/backend";
import OpenAI from "openai";

// Definir una funcion asincrona para manejar las solicitudes POST
export async function POST(req: Request): Promise<Response> {

    const organization = process.env.ORGANIZATION;
    const apiKey = process.env.OPENAI_API_KEY;

    if (!organization){
        throw new Error("La codigo de tu organización no esta configurada.");
    }

    if (!apiKey){
        throw new Error("La clave API de OpenAI no esta configurada.");
    }
    
    const openai = new OpenAI({
        organization: organization,
        apiKey: apiKey
      });

    // Obtener la clave API desde las variables de entorno
    
    const copilotKit = new CopilotRuntime();
    return copilotKit.response(
        req,
        new OpenAIAdapter({ openai, model: "gpt-3.5-turbo" }),
    );
}