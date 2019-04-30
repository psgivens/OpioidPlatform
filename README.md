# Opioid Platform

This project would have been our submission for the https://www.theopioidhackathon.com/ in October 2018.

### Software Application Development

**A.   Infrastructure/application interface for ethical/secure sharing of opioid-related data among key stakeholders**

Opioid-related data typically suffer from reporting lagtimes and lack of detailed information, making it difficult for researchers and public health departments to address the growing crisis. Real-time data can be provided by various stakeholders (e.g., patients, families, industry, public health, law enforcement, etc) through social media, internet search data results, medical records, wearable data, etc. Analysis of these data may help to address this problem by providing real-time novel, personalized information that help public health departments take actionable steps such as deploying interventions and resources. However, there are a number of infrastructural, ethical, and user experience-related questions around collecting and facilitating the sharing of these types of personal data. For example, how could a system or technology like this be created for data to be shared and used in a secure and ethical way so that stakeholders are aware of the risks/benefits of being engaged in this activity?

Winning solutions to this track should include a working prototype of a technology and/or mockup showing the interface for how each of the key stakeholders would use and understand how to use the technology.

## Notes for my future canabalism of this project

## Technology Stack

* Typescript & react
* React / React-Router / React-Redux / React-Sagas
* Indexeddb
* webworkers
* Bulma

### Install Log

    # Globally
    sudo npm install -g typescript

    sudo npm install -g create-react-app
        
    # Create app with typescript
    create-react-app soqle --scripts-version=react-scripts-ts
    cd soqle
   
    # copy packages.json
    # https://raw.githubusercontent.com/psgivens/PersonalTracker/master/webapp/package.json
    npm install 

### Development

1. Create a couple of pages using routes
1.1. Crate a MainMenu control
1.2. Replace App.tsx with routing information
2. Create reducers


### Problem Log    
    
Ran into problems running `npm start`. I installed ts-jest. `npm install ts-jest`. The problem went way, but I don't know if this was the fix. 

