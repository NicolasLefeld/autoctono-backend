// Emojis para los diferentes rangos de status HTTP
export const getStatusEmoji = (status: number) => {
    if (status >= 500) return "🔥"; // Error del servidor
    if (status >= 400) return "⚠️"; // Error del cliente
    if (status >= 300) return "🔄"; // Redirección
    if (status >= 200) return "✅"; // Éxito
    return "ℹ️"; // Informativo
};
