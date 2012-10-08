jquery.freezetable
===========

The jquery.freezetable plugin freezes the header row of a table and adds a scroll bar to allow a long table to be scrolled vertically.

Overview
--------

jquery.freezetable when applied to a table will freeze the top table header and add vertical scroll bars to the body of the table.

The table markup needs to adhere to the <a href="http://www.w3.org/TR/html4/struct/tables.html">HTML 4.01 Specification for Tables</a>. The row groups <a href="http://www.w3.org/TR/html4/struct/tables.html#edef-THEAD">THEAD</a> and <a href="http://www.w3.org/TR/html4/struct/tables.html#edef-TBODY">TBODY</a> are used to determine which sections of the table should be frozen.  jquery.freezetable clones the table and removes the TBODY from the cloned copy to 'freeze' the header.  It then removes the THEAD from the original table to make the scrollable portion of the table.  jquery.freezetable also depends on <a href="http://www.w3.org/TR/html4/struct/tables.html#edef-COLGROUP">COLGROUP</a> to maintain consistent column styling between the orginal and cloned header table.

###Expected &lt;table&gt; markup

    <table id="mytable">
      <colgroup>
        <col class="column-make" />
        <col class="column-display" />
        <col class="column-country" />       
      </colgroup>
      <thead>
        <tr>
          <th>make_id</th>
          <th>make_display</th>
          <th>make_country</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>abarth</td>
          <td>Abarth</td>
          <td>Italy</td>
        </tr>
      </tbody>
    </table>

###Usage

    $(document).ready(function () {
        $('#mytable').freezeTable({
            'autoHeight': false,
            'height': 160
        });
    });

Options
-------

**height**
    
The height of the scrollable part of the table.  Only used when 'autoHeight' is true.
    
`Integer - Default: 480`


**scrollbarWidth**

The width of the area to the right of the table reserved for the scrollbar.

`Integer - Default: 20`

**autoHeight**

When 'true' the scrollable section of the table will streach to fill the browser window.  When 'false' the scollable section of the table will determined by the 'height' option.

`Boolean - Default: false`

**autoHeightMarginBottom**

The size of the margin between the bottom of the browser window and the table when 'autoHeight' is true.

`Integer - Default: 20`