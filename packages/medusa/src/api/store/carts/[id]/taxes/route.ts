import { updateTaxLinesWorkflow } from "@medusajs/core-flows"
import { MedusaRequest, MedusaResponse } from "../../../../../types/routing"
import { refetchCart } from "../../helpers"
import { StoreCalculateCartTaxesType } from "../../validators"
import { HttpTypes } from "@medusajs/types"

export const POST = async (
  req: MedusaRequest<StoreCalculateCartTaxesType>,
  res: MedusaResponse<HttpTypes.StoreCartResponse>
) => {
  const workflow = updateTaxLinesWorkflow(req.scope)

  await workflow.run({
    input: {
      cart_or_cart_id: req.params.id,
      force_tax_calculation: true,
    },
  })

  const cart = await refetchCart(
    req.params.id,
    req.scope,
    req.remoteQueryConfig.fields
  )

  res.status(200).json({ cart })
}
