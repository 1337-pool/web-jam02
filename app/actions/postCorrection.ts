export async function createCorrection({ title, login, codeSnippet, score, questions } : any) {
    try {
        const response = await fetch("/api/session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            title, login, codeSnippet, score, questions: JSON.stringify(questions)
            }),
        });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();
      console.log(data)

        return data; // The response data from axios
    } catch (error) {
        // throw new Error(`Error: ${error.response ? error.response.statusText : error.message}`);
        console.error(error)
    }
}
export async function updateCorrection({ id, score } : any) {
    try {
        const response = await fetch("/api/session", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            id, score
            }),
        });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();
      console.log(data)

        return data; // The response data from axios
    } catch (error) {
        // throw new Error(`Error: ${error.response ? error.response.statusText : error.message}`);
        console.error(error)
    }
}