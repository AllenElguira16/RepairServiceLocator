import * as React from 'react';

class AboutUs extends React.Component<any, any>{
  render(){
    return (
      <div className="container code-bold">
        <div className="text-center my-4">
          <header><h4>WHAT IS RSOL?</h4></header>
          <div>
            A LOCATOR SYSTEM CATERING REPAIR SHOP OF DAGUPAN CITY MAKING
            IT MORE EASIER AND LESS HASSLE WHEN MANUALLY FINDING A REPAIRT SHOPS IN DAGUPAN CITY,
            RSL Is ALSO FOCUSING ON LOCAL REPAIR SHOP IN DAGUPAN CITY.
          </div>
        </div>
        <div className="row my-4">
          <div className="text-left col-6">
            <header><h4>What does it do?</h4></header>
            <div>OUR LOCATOR APP cATERS REPAIR SHOPS sucH AS
            AUTOMOTIVE REPAIR SHOPS, APPLIANCES REPAIR SHOP

            AND GADGETS REEAIR SERVICE SHOPS AND IS ONLY
            APPLICABLE WITHIN TPE CITY OF DAGUPAN</div>
          </div>
          {/* <div className="col-6">
            <img src="/images/AboutUs2.jpg" alt=""/>  
          </div> */}
        </div>
        <div className="row my-4">
          <div className="col-6">
            <img src="/images/AboutUs1.png" alt=""/>
          </div>
          <div className="mt-5 text-right col-6">
            <header><h4>WHO ARE WE?</h4></header>
            <div>
              WE FOUND WAYS ON How TO ELIMINATE THE HASSLE
              WHEN FINDING A REPAIR SHOP AND THIS SYSFEM IS THE

              PRODUCT OF OUR CREATIVE IMAGINATION.

              WE, THE DEVELOPERS AIMS TO BRING COMFORT AND
              EASE WHEN LOOKING FOR A REPAIR SHOP

              WE ALSO PUT OURSELVES FUTURE CLIENTS TO KNOW
              WHAT WE SHOULD PUT AND WHAT NOT TO
            </div>
          </div>
        </div>
        <div className="text-center my-4">
          <header><h4>ABOUT US</h4></header>
          <div>
            REPAIR SERVICE ONLINE LOCATOR HELPS PEOPLE FIND REPAIR SHOPS
            THAT SUITS THEIR NEDS. A FASTER AND EASIER WAV TO CONNECT TO THE REPAIR SHOPS
            WITH THE USE OF ON TIVE LIVE CHAT, UPDATED RATINGS FROM PAST CLIENTS AND MORE
          </div>
        </div>
      </div>
    );
  }
}
export default AboutUs;