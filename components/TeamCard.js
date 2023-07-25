export default function TeamCard({ header, subHeader, body, hyperlinks, img }) {
  return (
    <div>

      <div className="eachTeam pb-4 md:pr-0 md:mr-0 md:px-8 md:py-14 xl:p-14 xl:pl-0 relative flex flex-wrap justify-between">

        <div className="teamConent xl:basis-1/2">
          <h4 className="text-purple-600 mb-4 font-bold text-xl md:text-2xl lg:text-4xl">
            {header}
          </h4>
          <h5 className="text-yellow-1  font-bold text-sm md:text-lg lg:text-2xl ">
            {subHeader}
          </h5>
          <div className="mt-6">
            {/* <p className="text-lg text-left font-Mont font-semibold mt-6">
              Souvik is an Electrical Engineer by academics and Frontend
              Developer by profession.<br></br> He mainly handles animations
              texturing of the 3D models.
            </p>
            <p className="text-lg text-left  font-Mont mt-4 font-semibold">
              It is another dummy text to fill the whitespace. We all have this
              section in common.It is because there is nothing motivating to
              tell you and we think we are still learning and not come so far to
              motivate you guys.We thought it is better than &quot;lorem
              ipsum&quot; dummy text so decided to put it.Keep smiling and
              supporting
            </p> */}
            {body.map(({ jsx, styleClass }, k) => {
              return (
                <p
                  key={k}
                  className={`text-lg text-left font-Mont font-semibold dark:text-slate-50 ${styleClass}`}
                >
                  {jsx}
                </p>
              );
            })}
          </div>
          <div className="socialmediaIcons mb-5 mt-6 flex flex-wrap">

            {/* facebook */}
            <div className="fb hover:-translate-y-1 transition  transform">
              <a
                rel="noopener noreferrer"
                target="_blank"
                href={hyperlinks.facebook}
              >
                <img src="images/facebook(1).png" alt="" />
              </a>
            </div>
            {/* Linked in*/}
            <div className="li ml-6 hover:-translate-y-1 transition  transform">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={hyperlinks.linkedin}
              >

                <img src="images/linkedin(1).png" alt="" />
              </a>
            </div>
          </div>
        </div>
        <div className="teamImage md:basis-full relative z-10 xl:basis-1/3 ">
          <img src={img} alt="" className="rounded-2xl z-10 dark:shadow-blob" />
        </div>
      </div>
    </div>
  );
}
