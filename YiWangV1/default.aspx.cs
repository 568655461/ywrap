using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;


namespace velocity_lxwmvc
{
    public partial class _Default : Page
    {
        public void Page_Load()
        {
            string index = System.Configuration.ConfigurationManager.AppSettings["defaultaction"].ToString();
            //显示主界面
            Response.Redirect(index);
        }
    }
}
