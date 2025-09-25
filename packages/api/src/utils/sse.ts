// Shared SSE utility for all routers
export class SSEManager {
  private connections = new Map<string, ReadableStreamDefaultController[]>();

  // Add connection for a user
  addConnection(userId: string, controller: ReadableStreamDefaultController) {
    if (!this.connections.has(userId)) {
      this.connections.set(userId, []);
    }
    this.connections.get(userId)!.push(controller);
  }

  // Remove connection when client disconnects
  removeConnection(userId: string, controller: ReadableStreamDefaultController) {
    const connections = this.connections.get(userId);
    if (connections) {
      const index = connections.indexOf(controller);
      if (index > -1) {
        connections.splice(index, 1);
      }
      if (connections.length === 0) {
        this.connections.delete(userId);
      }
    }
  }

  // Broadcast to all connections for a user
  broadcastToUser(userId: string, data: any) {
    const connections = this.connections.get(userId);
    if (connections) {
      const message = `data: ${JSON.stringify(data)}\n\n`;
      connections.forEach((controller) => {
        try {
          controller.enqueue(new TextEncoder().encode(message));
        } catch (error) {
          // Connection closed, remove it
          const index = connections.indexOf(controller);
          if (index > -1) {
            connections.splice(index, 1);
          }
        }
      });
    }
  }

  // Create SSE response
  createSSEResponse(userId: string) {
    const stream = new ReadableStream({
      start: (controller) => {
        this.addConnection(userId, controller);
        // Send initial connection message
        controller.enqueue(
          new TextEncoder().encode(
            `data: ${JSON.stringify({ type: "connected" })}\n\n`
          )
        );
      },
      cancel: (controller) => {
        this.removeConnection(userId, controller);
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Cache-Control",
      },
    });
  }
}

// Global SSE managers for each resource
export const bannerSSE = new SSEManager();
export const priceSSE = new SSEManager();
export const scheduleSSE = new SSEManager();
export const kidSSE = new SSEManager();
export const bookingSSE = new SSEManager();
export const billSSE = new SSEManager();
export const todosSSE = new SSEManager();