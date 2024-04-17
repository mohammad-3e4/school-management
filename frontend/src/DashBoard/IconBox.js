export default function IconBox({icon,title,count,bgcolor,textsize}) {
    return (
      <>
         <div
              className={` bg-gradient-to-r flex items-center m-4 shadow-2xl py-3 ${bgcolor} justify-around lg:w-1/4 bg-white`}
            >
              <div className="flex flex-col items-center">
                {icon}
                <p className={`${textsize}`}>{title}</p>
              </div>
              <div className="border-l border-gray-500 h-10 mx-2"></div>
              <div className="flex items-center">
                <h1 className="mr-2 text-3xl">{count}</h1>
              </div>
            </div>
      </>
    );
  }
  