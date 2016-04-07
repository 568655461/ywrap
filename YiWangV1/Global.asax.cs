namespace lxwmvc
{
    using System;
    using System.Web;
    using System.Data;

    using System.Collections;

    using System.Reflection;
    using System.Collections.Specialized;
    using lxwmvc;
    using System.Text;
    using System.Timers;
    using System.Text.RegularExpressions;


    /// <summary>
    /// 
    /// </summary>
    public class globalapplication : HttpApplication
    {
        /// <summary>
        /// 
        /// </summary>
        public globalapplication()
        {
            Error += new EventHandler(globalapplication_error);
        }

        void globalapplication_error(object sender, EventArgs e)
        {

        }
        /// <summary>
        /// 
        /// </summary>
        public void Application_OnStart()
        {
            try
            {               
                //初始化菜单信息
                applicationhelper.initmenupower();
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        protected void Application_BeginRequest(Object sender, EventArgs e)
        {

        }

        /// <summary>
        /// 
        /// </summary>
        public void Application_OnEnd()
        {
            //关闭
        }

        protected void Application_Error(Object sender, EventArgs e)
        {
            Exception ex = Server.GetLastError();
        }
    }
}