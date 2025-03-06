
 

export const HeaderItem = ({name, Icon}) => {
    return (
        <div className="  flex items-center gap-2   text-[18px] font-semibold cursor-pointer hover:underline underline-offset-8 mb-4">
            <Icon />
            <h2 className="">{name}</h2>
        </div>
    )
}
