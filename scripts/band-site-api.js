// Band site API class.
export default class bandSiteApi {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = "https://unit-2-project-api-25c1595833b2.herokuapp.com/";
  }

  // Creates a new comment.
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

  // Gets all the comments.
  getComments = async () => {
    try {
      const response = await axios.get(
        `${this.baseUrl}comments?api_key=${this.apiKey}`
      );

      const sortFunction = (a, b) => {
        return new Date(b.timestamp) - new Date(a.timestamp);
      };

      const sortedComments = response.data.sort(sortFunction);

      return sortedComments;
    } catch (error) {
      console.log("Error getting comments: ", error);
    }
  };

  // Gets all the shows.
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

  // Adds one Like to the specified comment.
  likeComment = async (id) => {
    try {
      const response = await axios.put(
        `${this.baseUrl}comments/${id}/like?api_key=${this.apiKey}`
      );

      return response.data;
    } catch (error) {
      console.log("Error liking comment: ", error);
    }
  };

  // Deletes the specified comment.
  deleteComment = async (id) => {
    try {
      const response = await axios.delete(
        `${this.baseUrl}comments/${id}?api_key=${this.apiKey}`
      );

      return response.data;
    } catch (error) {
      console.log("Error deleting comment: ", error);
    }
  };
}
