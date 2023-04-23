export const createUser = async (username, socialMediaHandle, email) => {

    const userApiObject = {
        username: username,
        socialMedia: socialMediaHandle,
        email: email        
    }

    console.log("hi");

    const response = await fetch("https://localhost:8080/create/user", {
        method: "POST",
        body: JSON.stringify(userApiObject)
    });
        // .then((response) => response.json())
        // .then((json) => console.log(json));
    console.log(response.json());
    return response.json();
}

const createNewArivingFlight_NoFlightNumber = async (username, 
    year, month, day, hour, minute, socialMediaHandle, email, terminal) => {
    const timeStamp = new Date(year, month, day, hour, minute);
    
    const userResponse = await createUser(username, socialMediaHandle, email);
    
    return;
}