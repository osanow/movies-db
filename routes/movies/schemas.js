const movieSchema = Type =>
    Type.object({
        title: Type.string(),
        year: Type.string().optional(),
        rated: Type.string().optional(),
        released: Type.string().optional(),
        runtime: Type.string().optional(),
        genre: Type.string().optional(),
        director: Type.string().optional(),
        writer: Type.string().optional(),
        actors: Type.string().optional(),
        plot: Type.string().optional(),
        language: Type.string().optional(),
        country: Type.string().optional(),
        awards: Type.string().optional(),
        poster: Type.string()
            .uri()
            .optional(),
        ratings: Type.array()
            .items(
                Type.object({
                    Source: Type.string(),
                    value: Type.string()
                })
            )
            .optional()
    });

module.exports = {
    movieSchema
};
