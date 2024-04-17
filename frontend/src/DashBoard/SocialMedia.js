export default function SocialMedia({gradientClass,icon,title,count}) {
  return (
    <>
      <div className="flex w-full justify-between h-auto ">
          <div className="w-full bg-gray-700 mx-1 ">
            <div
              className={`bg-gradient-to-r ${gradientClass} text-white p-8 shadow-lg justify-around lg:w-full bg-white`}
            >
              <div className="flex flex-col pb-4">{icon}</div>
              <div className="lg:flex items-center">
                <p className="text-md">{title}</p>
                <div className="border-l border-gray-500 h-10 mx-2"></div>
                <div className="flex items-center">
                  <h1 className="mr-2 text-3xl">{count}</h1>
                </div>
              </div>
            </div>
          </div>
      </div>
    </>
  );
}
