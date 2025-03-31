"use client"

import { useState, useCallback } from "react"

type ToastType = "default" | "success" | "error" | "warning"

interface Toast {
  id: string
  title: string
  description?: string
  type: ToastType
}

interface UseToastReturn {
  toasts: Toast[]
  toast: (props: { title: string; description?: string; type?: ToastType }) => void
  dismiss: (id: string) => void
  dismissAll: () => void
}

export function useToast(): UseToastReturn {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = useCallback(
    ({ title, description, type = "default" }: { title: string; description?: string; type?: ToastType }) => {
      const id = Math.random().toString(36).substring(2, 9)
      const newToast = { id, title, description, type }

      setToasts((prevToasts) => [...prevToasts, newToast])

      // Auto-dismiss after 5 seconds
      setTimeout(() => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
      }, 5000)

      return id
    },
    [],
  )

  const dismiss = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }, [])

  const dismissAll = useCallback(() => {
    setToasts([])
  }, [])

  return { toasts, toast, dismiss, dismissAll }
}

