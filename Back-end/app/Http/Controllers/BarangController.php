<?php

namespace App\Http\Controllers;

use App\Http\Resources\BarangResource;
use App\Http\Resources\IndexResource;
use App\Models\Barang;
use App\Models\Suplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Str;

class BarangController extends Controller
{

    public function index($slug)
    {
        //

        // $index=Barang::paginate(4);
        $leng = Barang::count();
        if ($slug === "all") {

            $barangs = Barang::orderBy('id')->paginate(2);
            $response = [
                'success' => true,
                'message' => 'list suplier',
                'response' => Response::HTTP_OK,
                'data' => BarangResource::collection($barangs),
                // 'index' => IndexResource::collection($index),
                'search' => $slug,
                'leng' => $leng
            ];
        } else {
            $barangs = Barang::where('nama_barang', 'LIKE', "%{$slug}%")
                ->orWhere('harga', 'LIKE', "%{$slug}%")
                ->orWhere('keterangan', 'LIKE', "%{$slug}%")
                ->orWhere('suplier_id->suplier->nama_suplier', 'LIKE', "%{$slug}%")
                ->orderby('id')
                ->paginate(2);

            $barangsleng = Barang::where('nama_barang', 'LIKE', "%{$slug}%")
                ->orWhere('harga', 'LIKE', "%{$slug}%")
                ->orWhere('keterangan', 'LIKE', "%{$slug}%")
                ->orWhere('suplier_id->suplier->nama_suplier', 'LIKE', "%{$slug}%")
                ->orderby('id')
                ->count();
            $response = [
                'success' => true,
                'message' => 'list suplier',
                'response' => Response::HTTP_OK,
                // 'index' => IndexResource::collection($index),
                'data' => BarangResource::collection($barangs),
                'search' => $slug,
                'leng' => $barangsleng
            ];
        }
        // return response()->json($response);
        return response()->json($response, Response::HTTP_OK);
    }

    public function store(Request $request)
    {
        //
        $validator = Validator::make($request->all(), [
            'nama_barang' => ['required'],
            'keterangan' => ['required'],
            'harga'  => ['required', 'numeric'],
            'stok'  => ['required', 'numeric'],
            'gambar' => ['required'],
            'suplier' => ['required'],
        ]);
        if ($validator->fails()) {
            $response = [
                'success' => false,
                'message' => $validator->errors(),
                'response' => Response::HTTP_UNPROCESSABLE_ENTITY,
                'data' => ''
            ];
            // return response()->json($response);
            return response()->json($response, Response::HTTP_UNPROCESSABLE_ENTITY);
        } else {

            $file = $request->file('gambar');
            $imageName = Str::random() . '-' . time() . '.' . $request->gambar->extension();
            $file->move(public_path('image'), $imageName);

            $barang = Barang::create([
                'nama_barang' => $request->nama_barang,
                'harga' => $request->harga,
                'stok' => $request->stok,
                'keterangan' => $request->keterangan,
                'suplier_id' => $request->suplier,
                'gambar' => $imageName,
            ]);
            $response    = [
                'success' => true,
                'message' => 'Transaksi Berhasil',
                'data'    => new BarangResource($barang)
            ];
            // return response()->json($response);
            return response()->json($response, Response::HTTP_OK);
        }
    }

    public function show($id)
    {
        //
        $barang = Barang::find($id);
        $response = [
            'success' => false,
            'message' => 'barang detail',
            'response' => Response::HTTP_UNPROCESSABLE_ENTITY,
            'data' => new BarangResource($barang)
        ];
        // return response()->json($response);
        return response()->json($response, Response::HTTP_OK);
    }


    public function update(Request $request, $id)
    {
        //
        $validator = Validator::make($request->all(), [
            'nama_barang' => ['required'],
            'keterangan' => ['required'],
            'harga'  => ['required', 'numeric'],
            'stok'  => ['required', 'numeric'],
            'gambar' => ['required'],
            'suplier' => ['required'],
        ]);
        if ($validator->fails()) {
            $response = [
                'success' => false,
                'message' => $validator->errors(),
                'response' => Response::HTTP_UNPROCESSABLE_ENTITY,
                'data' => ''
            ];
            // return response()->json($response);
            return response()->json($response, Response::HTTP_UNPROCESSABLE_ENTITY);
        } else {

            $file = $request->file('gambar');
            $imageName = Str::random() . '-' . time() . '.' . $request->gambar->extension();
            $file->move(public_path('image'), $imageName);

            $barang = Barang::find($id);
            $barang->update([
                'nama_barang' => $request->nama_barang,
                'harga' => $request->harga,
                'stok' => $request->stok,
                'keterangan' => $request->keterangan,
                'suplier_id' => $request->suplier,
                'gambar' => $imageName,
            ]);
            $response    = [
                'success' => true,
                'message' => 'Transaksi Berhasil',
                'data'    => new BarangResource($barang)
            ];
            // return response()->json($response);
            return response()->json($response, Response::HTTP_OK);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        Barang::find($id)->delete();
        $response = [
            'success' => true,
            'message' => 'data berhasil dihapus',
            'data' => ''
        ];
        return response()->json($response, Response::HTTP_OK);
    }
}
