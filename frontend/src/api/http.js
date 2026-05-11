const JSON_HEADERS = {
  "Content-Type": "application/json"
};

async function parseResponse(response) {
  const contentType = response.headers.get("content-type");
  const hasJson = contentType && contentType.includes("application/json");
  const payload = hasJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message = typeof payload === "string" ? payload : payload?.message || "Request failed";
    throw new Error(message);
  }
  return payload;
}

export async function httpGet(url) {
  const response = await fetch(url);
  return parseResponse(response);
}

export async function httpPost(url, body) {
  const response = await fetch(url, {
    method: "POST",
    headers: JSON_HEADERS,
    body: JSON.stringify(body)
  });
  return parseResponse(response);
}

export async function httpPut(url, body) {
  const response = await fetch(url, {
    method: "PUT",
    headers: JSON_HEADERS,
    body: JSON.stringify(body)
  });
  return parseResponse(response);
}

export async function httpPatch(url, body = null) {
  const response = await fetch(url, {
    method: "PATCH",
    headers: body ? JSON_HEADERS : undefined,
    body: body ? JSON.stringify(body) : undefined
  });
  return parseResponse(response);
}

export async function httpDelete(url) {
  const response = await fetch(url, { method: "DELETE" });
  if (response.status === 204) {
    return null;
  }
  return parseResponse(response);
}
