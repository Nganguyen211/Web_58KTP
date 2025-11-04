using System;
using System.Web.Script.Serialization;
using MyLib;
using System.Collections.Generic;

public partial class api : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        int n;
        int.TryParse(Request["num"], out n);

        var table = new MultiplicationTable();
        List<string> result = (n >= 1 && n <= 9) ? table.Generate(n) : table.GenerateAll();

        Response.ContentType = "application/json";
        Response.Write(new JavaScriptSerializer().Serialize(result));
        Response.End();
    }
}v
