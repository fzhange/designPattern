const axios = require('axios');

class RequestQueue {
  constructor(maxConcurrent) {
    this.maxConcurrent = maxConcurrent;
    this.running = 0;
    this.queue = [];
  }

  add(request) {
    return new Promise((resolve, reject) => {
      const wrappedRequest = async () => {
        try {
          const response = await request();
          resolve(response.data);
        } catch (error) {
          reject(error);
        }
      };

      if (this.running < this.maxConcurrent) {
        this.execute(wrappedRequest);
      } else {
        this.queue.push(wrappedRequest);
      }
    });
  }

  async execute(request) {
    this.running++;
    console.log(`tasks count in running : ${this.running}. Queue length: ${this.queue.length}`);
    try {
      await request();
    } finally {
      this.running--;
      if (this.queue.length > 0) {
        const nextRequest = this.queue.shift();
        this.execute(nextRequest);
      }
    }
  }
}

// Create Axios instance
const axiosInstance = axios.create();

// Create request queue with a maximum concurrent count of 5
const requestQueue = new RequestQueue(2);
let queueLength = 0;

const intervalId = setInterval(() => {
  if (queueLength > 9) clearInterval(intervalId);

  // Add requests to the queue and retrieve their responses
  queueLength++;

  requestQueue
    .add(() => axiosInstance.get('http://192.168.2.93:3000/sss'))
    .then((response) => {
      console.log('Response from endpoint1:', response);
    })
    .catch((error) => {
      console.error('Error occurred during the request:', error);
    });
}, 100);

// Wait for all requests to complete
setTimeout(() => {
  if (requestQueue.running === 0) {
    console.log('All requests completed');
  } else {
    console.log('There are still requests in progress');
  }
}, 5000);
