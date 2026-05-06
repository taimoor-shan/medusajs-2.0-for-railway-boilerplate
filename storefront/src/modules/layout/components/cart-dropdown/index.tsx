"use client"

import { Menu, MenuButton, MenuItems } from "@headlessui/react"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { ShoppingCart } from "lucide-react"
import { Button } from "@medusajs/ui"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"

const CartDropdown = ({
  cart: cartState,
  iconOnly = false,
}: {
  cart?: HttpTypes.StoreCart | null
  iconOnly?: boolean
}) => {
  const totalItems =
    cartState?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  const subtotal = cartState?.subtotal ?? 0

  return (
    <Menu>
      <MenuButton
        className={
          iconOnly
            ? "flex items-center justify-center rounded-full text-black cursor-pointer"
            : "hover:text-ui-fg-base cursor-pointer"
        }
        aria-label={
          totalItems > 0
            ? `Shopping cart with ${totalItems} items`
            : "Shopping cart"
        }
      >
        {iconOnly ? (
          <>
            <ShoppingCart />
            <span className="sr-only">{`Cart (${totalItems})`}</span>
          </>
        ) : (
          `Cart (${totalItems})`
        )}
      </MenuButton>

      <MenuItems
        transition
        anchor={{ to: "bottom end", gap: 1 }}
        className="w-[420px] bg-white border-x border-b border-gray-200 text-ui-fg-base origin-top transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
      >
        <div className="p-4 flex items-center justify-center">
          <h3 className="text-large-semi">Cart</h3>
        </div>
        {cartState && cartState.items?.length ? (
          <>
            <div className="overflow-y-scroll max-h-[402px] px-4 grid grid-cols-1 gap-y-8 no-scrollbar p-px">
              {cartState.items
                .sort((a, b) => {
                  return (a.created_at ?? "") > (b.created_at ?? "")
                    ? -1
                    : 1
                })
                .map((item) => (
                  <div
                    className="grid grid-cols-[122px_1fr] gap-x-4"
                    key={item.id}
                    data-testid="cart-item"
                  >
                    <LocalizedClientLink
                      href={`/products/${item.product_handle}`}
                      className="w-24"
                    >
                      <Thumbnail
                        thumbnail={item.variant?.thumbnail || item.thumbnail}
                        images={item.variant?.images || item.variant?.product?.images}
                        size="square"
                      />
                    </LocalizedClientLink>
                    <div className="flex flex-col justify-between flex-1">
                      <div className="flex flex-col flex-1">
                        <div className="flex items-start justify-between">
                          <div className="flex flex-col overflow-ellipsis whitespace-nowrap mr-4 w-[180px]">
                            <h3 className="text-base-regular overflow-hidden text-ellipsis">
                              <LocalizedClientLink
                                href={`/products/${item.product_handle}`}
                                data-testid="product-link"
                              >
                                {item.title}
                              </LocalizedClientLink>
                            </h3>
                            <LineItemOptions
                              variant={item.variant}
                              data-testid="cart-item-variant"
                              data-value={item.variant}
                            />
                            <span
                              data-testid="cart-item-quantity"
                              data-value={item.quantity}
                            >
                              Quantity: {item.quantity}
                            </span>
                          </div>
                          <div className="flex justify-end">
                            <LineItemPrice
                              item={item}
                              style="tight"
                              currencyCode={cartState.currency_code}
                            />
                          </div>
                        </div>
                      </div>
                      <DeleteButton
                        id={item.id}
                        className="mt-1"
                        data-testid="cart-item-remove-button"
                      >
                        Remove
                      </DeleteButton>
                    </div>
                  </div>
                ))}
            </div>
            <div className="p-4 flex flex-col gap-y-4 text-small-regular">
              <div className="flex items-center justify-between">
                <span className="text-ui-fg-base font-semibold">
                  Subtotal{" "}
                  <span className="font-normal">(excl. taxes)</span>
                </span>
                <span
                  className="text-large-semi"
                  data-testid="cart-subtotal"
                  data-value={subtotal}
                >
                  {convertToLocale({
                    amount: subtotal,
                    currency_code: cartState.currency_code,
                  })}
                </span>
              </div>
              <LocalizedClientLink href="/cart" passHref>
                <Button
                  className="w-full"
                  size="large"
                  data-testid="go-to-cart-button"
                >
                  Go to cart
                </Button>
              </LocalizedClientLink>
            </div>
          </>
        ) : (
          <div>
            <div className="flex py-16 flex-col gap-y-4 items-center justify-center">
              <div className="bg-gray-900 text-small-regular flex items-center justify-center w-6 h-6 rounded-full text-white">
                <span>0</span>
              </div>
              <span>Your shopping bag is empty.</span>
              <div>
                <LocalizedClientLink href="/store">
                  <>
                    <span className="sr-only">Go to all products page</span>
                    <Button>Explore products</Button>
                  </>
                </LocalizedClientLink>
              </div>
            </div>
          </div>
        )}
      </MenuItems>
    </Menu>
  )
}

export default CartDropdown
