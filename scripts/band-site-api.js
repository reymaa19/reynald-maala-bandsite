// Band site API class.
export default class bandSiteApi {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = "https://unit-2-project-api-25c1595833b2.herokuapp.com/";
  }

  // Posts a new comment to the API.
  postComment = async (comment) => {
    try {
      const response = await axios.post(
        `${this.baseUrl}comments?api_key=${this.apiKey}`,
        comment
      );

      return response.data;
    } catch (error) {
      console.log("Error posting comment: ", error);
    }
  };

  // Gets all the comments from the API.
  getComments = async () => {
    try {
      const response = await axios.get(
        `${this.baseUrl}comments?api_key=${this.apiKey}`
      );
      
      const sortedComments = response.data.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );

      return sortedComments;
    } catch (error) {
      console.log("Error getting comments: ", error);
    }
  };

  // Gets all the shows from the API.
  getShows = async () => {
    try {
      const response = await axios.get(
        `${this.baseUrl}showdates?api_key=${this.apiKey}`
      );

      return response.data;
    } catch (error) {
      console.log("Error getting shows: ", error);
    }
  };
}
