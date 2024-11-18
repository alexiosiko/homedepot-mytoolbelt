import React from 'react'

export default function Highlight({ children, className} : {
	className?: string,
	children: React.ReactNode;
}) {
  return (
	<span className={`text-primary font-bold ${className}`}>{children}</span>
  )
}
