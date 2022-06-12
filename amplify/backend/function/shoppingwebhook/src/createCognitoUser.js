const aws = require("aws-sdk");

const cognito = new aws.CognitoIdentityServiceProvider({
  apiVersion: "2016-04-18",
});

const createCognitoUser = async ({ UserPoolId, Username }) => {
  try {
    const user = await cognito
      .adminCreateUser({
        UserPoolId,
        Username,
        DesiredDeliveryMediums: ["EMAIL"],
        UserAttributes: [
          {
            Name: "email",
            Value: Username,
          },
        ],
      })
      .promise();

    return user;
  } catch (e) {
    if (e.code === "UsernameExistsException") {
      const user = await cognito
        .adminGetUser({
          UserPoolId,
          Username,
        })
        .promise();

      return user;
    }

    throw Error("application error", e);
  }
};
module.exports.createCognitoUser = createCognitoUser;
