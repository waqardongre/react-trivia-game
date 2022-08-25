export const gameService =  {
    getQuestionFunction : async() => {
        const response = await fetch("https://opentdb.com/api.php?amount=1", {
            method: "GET"
        })
        return await response.json()
    }
}