// import * as signalR from "@microsoft/signalr";

// const base = process.env.NEXT_PUBLIC_API_BASE_URL!
//   .replace("/api/v1", ""); // bỏ phần API prefix

// export const userHubConnection = new signalR.HubConnectionBuilder()
//   .withUrl(`${base}/hubs/users`, {
//     withCredentials: true, // GỬI COOKIE
//   })
//   .withAutomaticReconnect()
//   .build();

// export async function startUserHub() {
//   try {
//     if (userHubConnection.state === signalR.HubConnectionState.Disconnected) {
//       await userHubConnection.start();
//       console.log("Connected to UserHub");
//     }
//   } catch (err) {
//     console.error("SignalR connect failed:", err);
//     setTimeout(startUserHub, 3000);
//   }
// }