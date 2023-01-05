export interface MaterialProps {
  /**
   * 商品数据列表
   *
   * @title 商品列表
   */
  productList?: Array<{
    /**
     * 商品id
     *
     * @title 商品id
     */
    id: string;
    /**
     * 商品标题
     *
     * @title 标题
     */
    title: string;
    /**
     * 商品标签，逗号隔开
     *
     * @title 商品标签
     */
    labels: string | string[];
    /**
     * 商品预览图片
     *
     * @title 预览图片
     */
    imageUrl: string;
    /**
     * 商品价格
     *
     * @title 商品价格
     */
    price: string;
  }>;
}
