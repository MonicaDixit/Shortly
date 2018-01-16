# Shortly

Shortly is an app created using Node, Express.js, MongoDb and vanilla javascript. Gulp is used as the taskrunner.
Shortly creates a tiny url link when the user gives it a long url.
Shortly uses a smart encoding algorithm to make sure every long url gets a unique short url

To use Shortly, please do the following
1. Clone the repo on to your machine (mac preferred)
2. To install the dependencies, cd into the directory where you cloned the repo and type this : npm init
  This will result in creating a folder called node_modules in your code repo and this is where all the dependencies are included.
  
 3. Make sure you have a local instance of mongodb running. Refer to this link if you need help installing/running mongodb locally : https://treehouse.github.io/installation-guides/mac/mongo-mac.html
 4.To run shortly, navigate to the root of the directory where you cloned the repo and type this: gulp
 5. To run tests, navigate to the root of the directory where you cloned the repo and type this: gulp test
 6. By deafult shortly will run on port 3000 on your machine.
 
Expected Behaviour:
After the app starts on your localhost, you can try out the following:
1. Provide a valid long url , fully qualified url (for eg. provide 'http://www.google.com" and not "www.google.com")
2. Hit the submit button (Shortly Me!)
3. Shortly comes back with your shortened link.
4. Hit the link provided, you will be redirected to the actual long url
5. Enter the same long url in the input box the second time, shortly will return the same short link as created in step 3 above
6. If you enter a url that does not exist, you will be navigated to the home page , shortly knows you made a mistake the first time 
  and shortly believes that everyone deserves a second chance :)) !
  
