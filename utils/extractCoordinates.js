// utils/extractCoordinates.js
import axios from "axios";

export const extractCoordinatesFromMapUrl = async (shortUrl) => {
  try {
    const response = await axios.get(shortUrl, {
      maxRedirects: 5,
    });

    const finalUrl = response.request.res.responseUrl;

    const match = finalUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);

    if (match) {
      return {
        lat: match[1],
        lng: match[2],
      };
    }

    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
};
