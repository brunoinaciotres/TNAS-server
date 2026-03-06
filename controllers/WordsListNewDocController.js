import WordsListNewDocModel from "../model/WordsListNewDocModel.js"

class WordsListNewDocController {
    async getAllWords(_, res) {

        try {
            const wordsList = await WordsListNewDocModel.getAllWords()

            return res.status(200).json({
                success: true,
                wordsList
            })
        }
        catch (e) {
            console.log(e)
            return res.status(500).json({
                success: false,
                e
            })
        }

    }

    async insertOrUpdateNewWord(req, res) {

        try {
            const { newWords, updatedWords } = req.body

            if (!newWords && !updatedWords) {
                return res.status(400).json({
                    success: false,
                    message: 'Todos os campos obrigatórios devem ser preenchidos.'
                })
            }

            let insertedWordsResult = []
            let updatedWordsResult = []

            if (newWords.length > 0) {

                insertedWordsResult = await Promise.all(
                    newWords.map(word =>
                        WordsListNewDocModel.insertNewWord(
                            word.word,
                            word.category.value
                        )
                    )
                )

            }

            if (updatedWords.length > 0) {
                updatedWordsResult = await Promise.all(
                    updatedWords.map(word =>
                        WordsListNewDocModel.updateWord(word.id, word.word, word.category.value)
                    )
                )
            }



            return res.status(200).json({
                success: true,
                insertedWordsResult,
                updatedWordsResult
            })
        }
        catch (e) {
            console.log(e)
            return res.status(500).json({
                success: false,
                message: e.message
            })
        }

    }
}

export default new WordsListNewDocController()