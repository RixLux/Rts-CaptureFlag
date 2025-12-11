module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log("🟢 Player connected:", socket.id);

        socket.on("captureTile", (data) => {
            // Example:
            // data = { playerId, tileId }

            console.log("Tile captured:", data);

            // Broadcast to all other players
            io.emit("tileUpdated", data);
        });

        socket.on("disconnect", () => {
            console.log("🔴 Player disconnected:", socket.id);
        });
    });
};
