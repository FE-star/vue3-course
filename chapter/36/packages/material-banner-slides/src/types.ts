export interface MaterialProps {
  /**
   * 轮播广告宽度
   *
   * @title 宽度
   */
  width: number | string;
  /**
   * 轮播广告高度
   *
   * @title 高度
   */
  height: number | string;

  /**
   * 广告数据列表
   *
   * @title 数据列表
   */
  banners: Array<{
    /**
     * 广告文本
     *
     * @title 文本
     */
    text: string;
    /**
     * 广告背景
     *
     * @title 背景
     */
    background: string;

    /**
     * 广告跳转链接
     *
     * @title 广告链接
     */
    link: string;
  }>;
}
