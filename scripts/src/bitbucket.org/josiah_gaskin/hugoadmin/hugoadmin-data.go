package main

import (
    "bytes"
    "compress/gzip"
    "fmt"
    "io"
)

func bindata_read(data []byte, name string) ([]byte, error) {
	gz, err := gzip.NewReader(bytes.NewBuffer(data))
	if err != nil {
		return nil, fmt.Errorf("Read %q: %v", name, err)
	}

	var buf bytes.Buffer
	_, err = io.Copy(&buf, gz)
	gz.Close()

	if err != nil {
		return nil, fmt.Errorf("Read %q: %v", name, err)
	}

	return buf.Bytes(), nil
}

func data_defaultsingle_html() ([]byte, error) {
	return bindata_read([]byte{
		0x1f, 0x8b, 0x08, 0x00, 0x00, 0x09, 0x6e, 0x88, 0x00, 0xff, 0xb2, 0xc9,
		0x28, 0xc9, 0xcd, 0xb1, 0xe3, 0xb2, 0xc9, 0x48, 0x4d, 0x4c, 0xb1, 0xb3,
		0x29, 0xc9, 0x2c, 0xc9, 0x49, 0xb5, 0xab, 0xae, 0x56, 0xd0, 0x0b, 0x01,
		0xb1, 0x14, 0x6a, 0x6b, 0x6d, 0xf4, 0x21, 0x62, 0x5c, 0x36, 0xfa, 0x60,
		0x25, 0x5c, 0x36, 0x49, 0xf9, 0x29, 0x95, 0x20, 0x0d, 0x86, 0x68, 0xea,
		0x80, 0x02, 0x5c, 0x20, 0x11, 0xe7, 0xfc, 0xbc, 0x92, 0xd4, 0xbc, 0x12,
		0xa0, 0x18, 0x50, 0x0f, 0x54, 0xb1, 0x3e, 0xd8, 0x16, 0x40, 0x00, 0x00,
		0x00, 0xff, 0xff, 0xb8, 0xa1, 0x3c, 0x96, 0x6c, 0x00, 0x00, 0x00,
		},
		"data/defaultSingle.html",
	)
}

func data_siteindex_html() ([]byte, error) {
	return bindata_read([]byte{
		0x1f, 0x8b, 0x08, 0x00, 0x00, 0x09, 0x6e, 0x88, 0x00, 0xff, 0xb2, 0xc9,
		0x28, 0xc9, 0xcd, 0xb1, 0xe3, 0xb2, 0xc9, 0x48, 0x4d, 0x4c, 0xb1, 0xe3,
		0xe2, 0xb4, 0x29, 0xc9, 0x2c, 0xc9, 0x49, 0xb5, 0xab, 0xae, 0x56, 0xd0,
		0x0b, 0x01, 0xb1, 0x14, 0x6a, 0x6b, 0x6d, 0xf4, 0x21, 0x62, 0x5c, 0x36,
		0xfa, 0x10, 0x45, 0x36, 0x49, 0xf9, 0x29, 0x95, 0x20, 0xb5, 0x19, 0x86,
		0x76, 0x0a, 0x1e, 0xa9, 0x39, 0x39, 0xf9, 0x0a, 0xe1, 0xf9, 0x45, 0x39,
		0x29, 0x0a, 0x40, 0x05, 0x86, 0x20, 0x65, 0x10, 0x79, 0x20, 0x0f, 0x6c,
		0x34, 0x20, 0x00, 0x00, 0xff, 0xff, 0x96, 0x2d, 0x1a, 0xfd, 0x62, 0x00,
		0x00, 0x00,
		},
		"data/siteIndex.html",
	)
}

func data_typeindex_html() ([]byte, error) {
	return bindata_read([]byte{
		0x1f, 0x8b, 0x08, 0x00, 0x00, 0x09, 0x6e, 0x88, 0x00, 0xff, 0x54, 0x8e,
		0x41, 0x12, 0x83, 0x20, 0x0c, 0x45, 0xd7, 0x72, 0x0a, 0xc7, 0x03, 0xc8,
		0x74, 0x9f, 0xba, 0xf2, 0x00, 0x2e, 0x7a, 0x81, 0xb4, 0xa6, 0xca, 0x14,
		0x91, 0x41, 0xba, 0xe8, 0x64, 0x72, 0xf7, 0x12, 0xda, 0x8d, 0xab, 0xc0,
		0xff, 0x8f, 0x47, 0x60, 0xcd, 0x9b, 0x1f, 0x0c, 0xac, 0x84, 0x73, 0x19,
		0xd9, 0x65, 0x4f, 0x03, 0x73, 0x7f, 0xd3, 0x83, 0x08, 0xd8, 0x5f, 0x62,
		0xc0, 0xfe, 0x89, 0xfb, 0x3e, 0x7f, 0x94, 0xbf, 0x9c, 0xa8, 0x72, 0x35,
		0xf0, 0x2e, 0x22, 0xe6, 0x84, 0x61, 0xa1, 0xb6, 0x1f, 0x31, 0x63, 0x3f,
		0xe1, 0x42, 0x87, 0x88, 0x69, 0x1a, 0xf0, 0x6e, 0xd0, 0x81, 0xed, 0x9a,
		0xe8, 0x79, 0xed, 0xca, 0xe3, 0x89, 0xd2, 0x86, 0xde, 0x85, 0x97, 0x48,
		0x77, 0x92, 0x61, 0x25, 0xa3, 0x66, 0x23, 0x1d, 0x8f, 0xe4, 0x62, 0x76,
		0x7b, 0xd0, 0x26, 0xd6, 0xc6, 0xaa, 0x8b, 0x99, 0xc2, 0x5c, 0xd4, 0x60,
		0xf5, 0x5b, 0xb0, 0x75, 0xaf, 0x6f, 0x00, 0x00, 0x00, 0xff, 0xff, 0x24,
		0x52, 0x47, 0xce, 0xce, 0x00, 0x00, 0x00,
		},
		"data/typeIndex.html",
	)
}

func data_typeinstance_md() ([]byte, error) {
	return bindata_read([]byte{
		0x1f, 0x8b, 0x08, 0x00, 0x00, 0x09, 0x6e, 0x88, 0x00, 0xff, 0x7c, 0x8f,
		0x31, 0xeb, 0xc2, 0x30, 0x10, 0xc5, 0xf7, 0x7c, 0x8a, 0xa3, 0x4b, 0xa7,
		0x14, 0xfe, 0x6b, 0x97, 0x3f, 0x82, 0x08, 0xee, 0xdd, 0xa4, 0x48, 0xa8,
		0x97, 0xf6, 0xb0, 0x26, 0x25, 0x77, 0xd2, 0xa1, 0xf4, 0xbb, 0x9b, 0x43,
		0x85, 0xea, 0x20, 0x64, 0xc8, 0xbd, 0xdf, 0xe3, 0x3d, 0x9e, 0xb5, 0xd6,
		0x08, 0xc9, 0x88, 0x35, 0x14, 0x07, 0x4a, 0x2c, 0x40, 0x81, 0xc5, 0x85,
		0x0e, 0x21, 0x7a, 0x58, 0x16, 0xa8, 0x1a, 0xa5, 0xb0, 0xae, 0x85, 0xb9,
		0x38, 0x51, 0x9b, 0x8a, 0xfb, 0xfc, 0x7d, 0x6a, 0xc8, 0x5d, 0xa2, 0x49,
		0x28, 0x86, 0x8c, 0x76, 0xb0, 0xb9, 0x35, 0x40, 0x06, 0xe2, 0xaf, 0x14,
		0x37, 0x92, 0x63, 0xe4, 0x1a, 0x4e, 0xad, 0x19, 0x29, 0x5c, 0xdf, 0xed,
		0x5e, 0xdb, 0x6d, 0xf4, 0xf6, 0xd3, 0xde, 0xa7, 0x78, 0x9f, 0xd4, 0x5d,
		0x6e, 0x75, 0x2e, 0xdb, 0x17, 0x39, 0xcf, 0x48, 0xfd, 0x20, 0x35, 0xfc,
		0x19, 0xdd, 0x62, 0x1a, 0x6d, 0xcc, 0x4f, 0x06, 0x04, 0xff, 0x73, 0x50,
		0x05, 0x47, 0x0e, 0x65, 0xe6, 0x02, 0x6e, 0x46, 0x8e, 0x37, 0xfc, 0x7f,
		0x04, 0x00, 0x00, 0xff, 0xff, 0x57, 0xde, 0xeb, 0x0a, 0x0e, 0x01, 0x00,
		0x00,
		},
		"data/typeInstance.md",
	)
}


// Asset loads and returns the asset for the given name.
// It returns an error if the asset could not be found or
// could not be loaded.
func Asset(name string) ([]byte, error) {
	if f, ok := _bindata[name]; ok {
		return f()
	}
	return nil, fmt.Errorf("Asset %s not found", name)
}

// _bindata is a table, holding each asset generator, mapped to its name.
var _bindata = map[string] func() ([]byte, error) {
	"data/defaultSingle.html": data_defaultsingle_html,
	"data/siteIndex.html": data_siteindex_html,
	"data/typeIndex.html": data_typeindex_html,
	"data/typeInstance.md": data_typeinstance_md,

}
