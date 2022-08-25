export const gameService =  {
    getQuestionFunction : async () => {
        // GET request using fetch
        return fetch('https://opentdb.com/api.php?amount=1')
        .then(async response => {
            const data = await response.json();
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }

            const dataDict = data['results'][0]
            return dataDict
        })
    }
}