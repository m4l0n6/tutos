export function TypingIndicator() {
  return (
    <>
      <style>{`@keyframes chatBlink { 0%,80%,100%{opacity:0.2} 40%{opacity:1} }`}</style>
      <div className="flex items-center gap-1.5 pr-4 pb-1.5 pl-4 text-[#666] text-xs">
        <span className="inline-flex gap-0.75">
          {[0, 200, 400].map((delay, i) => (
            <span
              key={i}
              className="inline-block bg-[#888] rounded-full w-1.25 h-1.25"
              style={{
                animation: `chatBlink 1.2s ease-in-out ${delay}ms infinite`,
              }}
            />
          ))}
        </span>
        đang nhập...
      </div>
    </>
  )
}
