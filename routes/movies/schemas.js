const movieSchema = Type =>
    Type.object({
        title: Type.string().optional(),
        id: Type.string().optional(),
        type: Type.string().optional(),
        year: Type.number().optional(),
        plot: Type.string().optional()
    });

module.exports = {
    movieSchema
};
