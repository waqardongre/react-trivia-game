export const gameService =  {
    getQuestionFunction : () => {
        // GET request using fetch with error handling
        return fetch('https://opentdb.com/api.php?amount=1')
        .then(async response => {
            const data = await response.json();
            // const option = data['results'][0]['option']
            // const answer = data['results'][0]['answer']
            // const incorrect_answers = data['results'][0]['incorrect_answers']
            // check for error response
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }

            const dataDict = data['results'][0]
            //console.log(dataDict)
            return dataDict
            //this.setState({optionDict: data['results'][0] })
        })
        .catch(error => {
            //this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);
        })
    }
};