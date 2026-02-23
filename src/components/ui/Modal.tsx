import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "./Card";
import { Button } from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
}) => {

  if (!isOpen) return null;

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">

      <div className="w-full max-w-md mx-4">

        <Card>

          {title && (

            <CardHeader className="flex justify-between items-center">

              <h2 className="text-lg font-semibold text-gray-900">
                {title}
              </h2>

              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
              >
                ✕
              </Button>

            </CardHeader>

          )}

          <CardBody>

            {children}

          </CardBody>

          {footer && (

            <CardFooter className="flex justify-end gap-2">

              {footer}

            </CardFooter>

          )}

        </Card>

      </div>

    </div>

  );

};