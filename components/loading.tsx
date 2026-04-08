import { Spinner } from "./ui/spinner"

interface BoxLoaderProps {
    text?: string
}

export const Loading = ({ text }: BoxLoaderProps) => {
    return (
      <div className="flex justify-center items-center w-full overflow-hidden">
        <div className="flex items-center h-screen">
            <Spinner className="w-12 h-12" />
            <div className="ml-4 text-lg">{text || "Đang tải..."}</div>
        </div>
      </div>
    )
}